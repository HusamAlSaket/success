<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

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
            'name' => 'required|string',
            'email' => 'required|email|unique:students',
            'phone_number' => 'required|string',
            'code' => 'required|string',
            'year' => 'required|integer',
            'city' => 'required|string',
            'speciality' => 'required|string',
            'password' => 'required|string',
        ]);

        $student = Student::create($request->all());
        return response()->json($student, 201);
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->update($request->all());
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
