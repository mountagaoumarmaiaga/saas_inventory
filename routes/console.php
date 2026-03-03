<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule performance reports
Schedule::command('reports:generate --period=daily')->dailyAt('08:00');
Schedule::command('reports:generate --period=weekly')->weeklyOn(1, '08:00'); // Monday at 8:00 AM
Schedule::command('reports:generate --period=monthly')->monthlyOn(1, '08:00'); // 1st of every month at 8:00 AM

