<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        dd($request->all());

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Login failed'], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ], 200);
    }


    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response(compact('user', 'token'), 201);
    }

    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
            return response(['message' => 'Logged out successfully'], 200);
        }

        return response(['message' => 'No active session'], 400);
    }
}

