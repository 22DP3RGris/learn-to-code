<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('programming_topics', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description');
            $table->integer('theory_size')->default(0);
            $table->integer('theory_exercise_count')->default(0);
            $table->integer('practice_exercise_count')->default(0);
            $table->enum('difficulty', ['begginer', 'intermediate', 'advanced', 'expert']);
            $table->foreignId('language_id')->constrained('programming_languages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programming_topics');
    }
};
