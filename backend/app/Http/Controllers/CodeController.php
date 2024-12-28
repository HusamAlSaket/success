<?php

namespace App\Http\Controllers;

use App\Models\Code;
use Illuminate\Http\Request;

class CodeController extends Controller
{
    public function index()
    {
        $codes = Code::all();
        return response()->json($codes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string',
            'year' => 'required',
            'semester' => 'required|in:1st,2nd',
            'code' => 'required|string|unique:codes',
        ]);

        $code = Code::create($request->all());
        return response()->json($code, 201);
    }

    public function update(Request $request, $id)
    {
        // Find by code_id instead of id
        $code = Code::where('code_id', $id)->firstOrFail();

        if (!$code) {
            return response()->json(['message' => 'Code not found'], 404);
        }

        $request->validate([
            'subject' => 'required|string',
            'year' => 'required',
            'semester' => 'required|in:1st,2nd',
            'code' => 'required|string|unique:codes,code,' . $id . ',code_id',
        ]);

        $code->update($request->all());
        return response()->json($code);
    }

    public function destroy($id)
    {
        // Find by code_id instead of id
        $code = Code::where('code_id', $id)->firstOrFail();

        if (!$code) {
            return response()->json(['message' => 'Code not found'], 404);
        }

        $code->delete();
        return response()->json(['message' => 'Code deleted']);
    }
}