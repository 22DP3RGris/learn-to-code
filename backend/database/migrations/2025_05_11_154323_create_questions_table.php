<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programming_questions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('theory_id')->constrained('programming_theory')->onDelete('cascade');
        $table->text('question');
        $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programming_questions');
    }
};
