<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('theory_change_requests', function (Blueprint $table) {
            $table->enum('status', ['NEW', 'UPDATE'])->default('NEW')->after('content');
        });
    }

    public function down()
    {
        Schema::table('theory_change_requests', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};