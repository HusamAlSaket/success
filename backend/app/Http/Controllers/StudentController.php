<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all(); // Get all students
        return response()->json($students);
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|email|unique:students,email', // Simplified unique validation
            'phone_number' => 'required|string',
            'code' => 'required|string|unique:students,code', // Added unique validation for code
            'year' => 'required|string', // Changed to string since that's your DB column type
            'city' => 'required|string',
            'specialty' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        // Create student with hashed password
        $student = Student::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'code' => $request->code,
            'year' => $request->year,
            'city' => $request->city,
            'specialty' => $request->specialty,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($student, 201);
    }
    public function update(Request $request, $student_id)
    {
        $student = Student::findOrFail($student_id);

        // Validate the request data
        $request->validate([
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'code' => 'required|string|max:10',
            'year' => 'required|string|max:4',
            'city' => 'required|string|max:255',
            'specialty' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $student_id . ',student_id',
            'password' => 'nullable|string|min:8',
        ]);

        // Prepare update data
        $updateData = $request->only([
            'full_name',
            'phone_number',
            'code',
            'year',
            'city',
            'specialty',
            'email'
        ]);

        // Only update password if it's provided
        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        // Update the student details
        $student->update($updateData);

        return response()->json($student);
    }

    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->delete();
        return response()->json(['message' => 'Student deleted']);
    }
    public function countStats()
    {
        $usedCodes = Student::where('code', '!=', '')->count();
        $notUsedCodes = Student::where('code', '=', '')->count();
        $totalStudents = Student::count();

        return response()->json([
            'used_codes' => $usedCodes,
            'not_used_codes' => $notUsedCodes,
            'total_students' => $totalStudents,
        ]);
    }
}
