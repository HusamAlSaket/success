<?php

namespace App\Http\Controllers;

use App\Mail\TestEmail;
use Illuminate\Http\Request;
use App\Models\User;
use Doctrine\Common\Cache\Cache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;  // Added this import
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['user' => $user], 201);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();
        $otp = rand(100000, 999999);

        // Store OTP in database instead of cache
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($otp),
                'created_at' => now()
            ]
        );

        Mail::to($user->email)->send(new TestEmail($otp));

        return response()->json([
            'message' => 'OTP sent to your email address.',
            'email' => $user->email
        ], 200);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
            'email' => 'required|email'
        ]);

        $otp = $request->otp;
        $email = $request->email;

        // Get stored OTP from database
        $storedData = DB::table('password_reset_tokens')
        ->where('email', $email)
            ->first();

        if (
            !$storedData || !$storedData->token ||
            now()->diffInMinutes($storedData->created_at) > 10
        ) {
            return response()->json(['message' => 'OTP has expired'], 400);
        }

        if (Hash::check($otp, $storedData->token)) {
            $user = User::where('email', $email)->first();
            $token = $user->createToken('auth_token')->plainTextToken;

            // Remove the OTP record
            DB::table('password_reset_tokens')
            ->where('email', $email)
                ->delete();

            return response()->json([
                'access_token' => $token,
                'user' => $user
            ], 200);
        }

        return response()->json(['message' => 'Invalid OTP'], 400);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
