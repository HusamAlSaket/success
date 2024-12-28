<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;


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

Route::get('/students', [StudentController::class, 'index']);  // Add this route for fetching students
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});
