<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Invoice;
use App\Models\Activity;
use Carbon\Carbon;

class SendInvoiceReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoices:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envoie des rappels pour les factures impayées approchant ou dépassant l\'échéance';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Vérification des factures à relancer...');

        // Find invoices that are APPROVED or SENT, not PAID
        // and due date is either today, or in the past (overdue)
        $invoices = Invoice::whereIn('status', ['APPROVED', 'SENT'])
            ->where(function ($query) {
                $query->whereDate('due_date', '<=', Carbon::today())
                      ->orWhereNull('due_date'); // Or use created_at + 30 days if no due date
            })
            ->where('amount_due', '>', 0)
            ->with(['client', 'entreprise'])
            ->get();

        $count = 0;

        foreach ($invoices as $invoice) {
            // Determine if due date is passed
            $dueDate = $invoice->due_date ? Carbon::parse($invoice->due_date) : $invoice->created_at->addDays(30);

            // Simple logic: we send a reminder if it's 3 days before, on the day, or every 7 days overdue
            $daysDiff = Carbon::today()->diffInDays($dueDate, false); // negative if past

            $shouldSendReminder = false;
            $reminderType = '';

            if ($daysDiff == 3) {
                $shouldSendReminder = true;
                $reminderType = 'reminder_upcoming';
            } elseif ($daysDiff == 0) {
                $shouldSendReminder = true;
                $reminderType = 'reminder_due_today';
            } elseif ($daysDiff < 0 && abs($daysDiff) % 7 == 0) {
                $shouldSendReminder = true;
                $reminderType = 'reminder_overdue';
            }

            if ($shouldSendReminder) {
                // Here, you would dispatch a Mailable or Notification
                // Mail::to($invoice->client->email)->send(new InvoiceReminderMail($invoice, $reminderType));
                
                // For now, let's log it in the FinTech activity feed
                Activity::create([
                    'entreprise_id' => $invoice->entreprise_id,
                    'user_id' => null, // System action
                    'type' => 'invoice_reminder',
                    'description' => "Rappel automatique envoyé pour la facture {$invoice->number}",
                    'subject_type' => Invoice::class,
                    'subject_id' => $invoice->id,
                    'properties' => ['type' => $reminderType, 'days_diff' => $daysDiff]
                ]);

                $this->info("Rappel ({$reminderType}) envoyé pour {$invoice->number}");
                $count++;
            }
        }

        $this->info("Terminé. {$count} rappel(s) envoyé(s).");
    }
}
