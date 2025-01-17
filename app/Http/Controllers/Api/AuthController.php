<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\SignupRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        
    }
    public function signup(SignupRequest $request)
    {
        echo "Hello, world!\n";
        $data = $request->validated();
        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password'])
        ]);

        $token = $user -> createToken('auth_token')->plainTextToken;

        return response(compact('user', 'token'));
    }
}
