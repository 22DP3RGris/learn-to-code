<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $userId = $this->user()->id;

        $rules = [
            'username' => ['required', 'string', 'max:55', 'regex:/^(?=.*[A-Za-z])[A-Za-z0-9\s]+$/'],  
            'email' => 'required|string|email|max:255|unique:users,email,' . $userId,
            'phone' => 'required|string|max:15',
            'role' => 'required|in:student,teacher,admin',
        ];

        if ($this->filled('password')) {
            $rules['password'] = 'nullable|string|min:8';
            $rules['password_confirmation'] = 'nullable|string|same:password';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'username.required' => 'The username is required.',
            'username.string' => 'The username must be a string.',
            'username.max' => 'The username may not be greater than 55 characters.',
            'username.regex' => 'The username must contain at least one letter and can only contain letters, numbers, and spaces.',
            'email.unique' => 'This email is already taken.',
            'password.min' => 'The password must be at least 8 characters.',
            'password_confirmation.same' => 'The password confirmation does not match.',
            'role.in' => 'The role must be one of the following: student, teacher, admin.',
        ];
    }
}
