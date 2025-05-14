<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CodeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProgrammingLanguageController;
use App\Http\Controllers\Api\ProgrammingTopicController;
use App\Http\Controllers\Api\TheoryController;
use App\Http\Controllers\Api\TheoryChangeRequestController; 
use App\Http\Controllers\Api\ProgrammingQuestionController;
use App\Http\Controllers\Api\ProgrammingAnswerController;
use App\Http\Controllers\Api\TopicRequestController;
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
Route::get('/users/filter', [UserController::class, 'filter'])->middleware('auth:sanctum');
Route::get('/users-role-statistics', [UserController::class, 'roleStatistics'])->middleware('auth:sanctum');
Route::get('/programming-languages', [ProgrammingLanguageController::class, 'index']);
Route::get('/programming-languages/{language?}/topics', [ProgrammingTopicController::class, 'index']);
Route::post('/programming-languages/{language}/topics', [ProgrammingTopicController::class, 'store'])
->middleware('auth:sanctum');
Route::post('/programming-languages/{name}/change-requests', [TopicRequestController::class, 'store'])->middleware('auth:sanctum');
Route::get('/topics/{topic}/theory', [TheoryController::class, 'index']);
Route::put('/theory/{id}', [TheoryController::class, 'update'])->middleware('auth:sanctum');
Route::post('/topics/{topicId}/theory', [TheoryController::class, 'store'])->middleware('auth:sanctum');
Route::post('/theory/{id}/change-request', [TheoryChangeRequestController::class, 'store'])->middleware('auth:sanctum'); 
Route::put('/theory-change-requests/{id}/approve', [TheoryChangeRequestController::class, 'approve'])->middleware('auth:sanctum'); 
Route::delete('/theory-change-requests/{id}/reject', [TheoryChangeRequestController::class, 'reject'])->middleware('auth:sanctum');
Route::get('/theory-change-requests', [TheoryChangeRequestController::class, 'index'])->middleware('auth:sanctum'); 
Route::get('/topics/{topic}/questions', [ProgrammingQuestionController::class, 'paginated']);
Route::post('/questions/{question}/submit', [ProgrammingAnswerController::class, 'submit'])->middleware('auth:sanctum');
Route::get('/questions/{questionId}/submission-status', [ProgrammingAnswerController::class, 'getSubmissionStatus'])->middleware('auth:sanctum');

Route::put('/topic-change-requests/{id}/approve', [TopicRequestController::class, 'approve'])->middleware('auth:sanctum');
Route::delete('/topic-change-requests/{id}/reject', [TopicRequestController::class, 'reject'])->middleware('auth:sanctum');
Route::get('/topic-change-requests', [TopicRequestController::class, 'index'])->middleware('auth:sanctum');

