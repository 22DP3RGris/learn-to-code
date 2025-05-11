<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programming_question_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('programming_question_id')->constrained('programming_questions')->onDelete('cascade');
            $table->foreignId('programming_answer_id')->constrained('programming_answers')->onDelete('cascade');
            $table->boolean('is_correct')->default(false);
            $table->timestamps();

            $table->unique(['user_id', 'programming_question_id'], 'user_question_unique')
                ->where('is_correct', false);;
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programming_question_submissions');
    }
};
