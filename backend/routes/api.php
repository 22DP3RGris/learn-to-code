<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CodeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ProgrammingLanguageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/run-code', [CodeController::class, 'runCode'])->middleware('auth:sanctum');
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::put('/user/update', [UserController::class, 'update'])->middleware('auth:sanctum');
Route::get('/admin/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::get('/users-sort', [UserController::class, 'sort'])->middleware('auth:sanctum');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('auth:sanctum');
Route::put('/users/{id}', [UserController::class, 'updateUser'])->middleware('auth:sanctum');
Route::get('/users-filter', [UserController::class, 'filter']);
Route::get('/programming-languages', [ProgrammingLanguageController::class, 'index']);
