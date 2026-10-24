import React from 'react';
import type { Metadata } from 'next';
import ProbetrainingForm from '@/components/ProbetrainingForm';
import { getProbetrainingPage } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: 'Probetraining anfragen',
  description:
    'Melde dich für ein Probetraining beim FC Inter Mainz 2005 e.V. an und werde Teil unseres Teams im Herzen von Mainz.',
};

export default async function ProbetrainingPage() {
  const { show_hinweis: showHinweis, hinweis_text: hinweisText } =
    await getProbetrainingPage();

  return (
    <main className="container mx-auto pt-36 pb-20 px-4 relative z-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-[var(--card-border)]">
        <div
          style={{ backgroundColor: 'var(--blue)' }}
          className="p-8 text-white text-center"
        >
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Anmeldung Probetraining
          </h1>
          <p className="mt-2 text-blue-200 text-sm">
            Werde Teil unserer Mannschaft im Herzen von Mainz.
          </p>
        </div>

        {showHinweis && (
          <div
            className="bg-red-50 border-l-4 border-[#cc0000] p-4 mx-8 mt-6 rounded-r-lg"
            id="hinweis-box"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-[#cc0000]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-[#cc0000] font-bold uppercase">
                  Wichtiger Hinweis:
                </p>
                <p className="text-sm text-red-700" id="hinweis-text">
                  {hinweisText}
                </p>
              </div>
            </div>
          </div>
        )}

        <ProbetrainingForm />
      </div>
    </main>
  );
}
