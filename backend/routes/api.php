<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\PackageController;
use App\Mail\TestEmail;
use Illuminate\Support\Facades\Mail;

/*
|---------------------------------------------------------------------------
| API Routes
|---------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('/packages', [PackageController::class, 'index']); // Fetch all packages
Route::post('/packages', [PackageController::class, 'store']); // Create a new package
Route::get('/packages/{id}', [PackageController::class, 'show']); // Fetch a single package by ID
Route::put('/packages/{id}', [PackageController::class, 'update']); // Update a package
Route::delete('/packages/{id}', [PackageController::class, 'destroy']); // Delete a package

Route::get('/students', [StudentController::class, 'index']);  
Route::post('/students', [StudentController::class, 'store']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);
Route::get('/students/stats', [StudentController::class, 'countStats']);

Route::get('/codes', [CodeController::class, 'index']);
Route::post('/codes', [CodeController::class, 'store']);
Route::put('/codes/{id}', [CodeController::class, 'update']);
Route::delete('/codes/{id}', [CodeController::class, 'destroy']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);

Route::post('/send-email', function () {
  Mail::to('husamalsaket2001@gmail.com')->send(new TestEmail());
  return response()->json(['message' => 'Test email has been sent!']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});
