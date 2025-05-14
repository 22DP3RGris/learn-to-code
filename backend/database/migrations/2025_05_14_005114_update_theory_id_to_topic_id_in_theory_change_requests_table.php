<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('theory_change_requests', function (Blueprint $table) {

            if (!Schema::hasColumn('theory_change_requests', 'topic_id')) {
                $table->foreignId('topic_id')
                    ->after('user_id')
                    ->constrained('programming_topics')
                    ->onDelete('cascade');
            }
        });
    }


    public function down()
    {
        Schema::table('theory_change_requests', function (Blueprint $table) {
            $table->dropForeign(['topic_id']);
            $table->dropColumn('topic_id');

            $table->foreignId('theory_id')
                ->after('user_id')
                ->constrained('programming_theory')
                ->onDelete('cascade');
        });
    }
};
