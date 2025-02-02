<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {   
        try {
            $credentials = $request->validated();
            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid credentials'], 422);
            }
    
            $user = Auth::user();
            $token = $user->createToken('main')->plainTextToken;
            return response()->json(compact('user', 'token'));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
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

