<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Entreprise;
use App\Models\User;
use App\Services\ReportService;
use App\Mail\PerformanceReportMail;
use Illuminate\Support\Facades\Mail;

class GeneratePerformanceReport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reports:generate {--period=monthly} {--entreprise=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate and email performance reports to all super-admins of entreprises';

    /**
     * Execute the console command.
     */
    public function handle(ReportService $reportService)
    {
        $period = $this->option('period');
        $entrepriseId = $this->option('entreprise');

        $query = Entreprise::query();
        if ($entrepriseId) {
            $query->where('id', $entrepriseId);
        }

        $entreprises = $query->get();

        foreach ($entreprises as $entreprise) {
            $this->info("Generating {$period} report for {$entreprise->name}");
            
            $metrics = $reportService->generateMetrics($entreprise, $period);
            
            // Get admins for this entreprise
            $admins = User::where('entreprise_id', $entreprise->id)
                ->where('role', 'SUPER_ADMIN') // or ADMIN depending on your structure
                ->get();
                
            foreach ($admins as $admin) {
                Mail::to($admin->email)->send(new PerformanceReportMail($entreprise, $metrics, $period));
                $this->line(" - Sent to {$admin->email}");
            }
        }

        $this->info("Reports generated successfully.");
    }
}
