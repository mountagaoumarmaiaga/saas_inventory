<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use App\Models\Entreprise;

class PerformanceReportMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $entreprise;
    public $metrics;
    public $period;

    /**
     * Create a new message instance.
     */
    public function __construct(Entreprise $entreprise, array $metrics, string $period)
    {
        $this->entreprise = $entreprise;
        $this->metrics = $metrics;
        $this->period = $period;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $periodLabels = [
            'daily' => 'Journalier',
            'weekly' => 'Hebdomadaire',
            'monthly' => 'Mensuel',
            'quarterly' => 'Trimestriel',
        ];
        
        $label = $periodLabels[$this->period] ?? ucfirst($this->period);

        return new Envelope(
            subject: "Votre Rapport de Performance $label - " . $this->entreprise->name,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.reports.performance',
            with: [
                'entreprise' => $this->entreprise,
                'metrics' => $this->metrics,
                'period' => $this->period,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // Future: Attache PdfService export here
        return [];
    }
}
