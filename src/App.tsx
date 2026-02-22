import { FormProvider } from '@/state';
import ErrorBoundary from '@/components/ErrorBoundary';
import BuilderPanel from '@/components/Builder';
import PreviewPanel from '@/components/Preview';
import ImportExport from '@/components/ImportExport';
import { APP } from '@/constants';
import '@/styles.css';

export default function App() {
  return (
    <ErrorBoundary>
      <FormProvider>
        <div className="app">
          <header className="app__header">
            <h1>{APP.TITLE}</h1>
            <p>{APP.SUBTITLE}</p>
          </header>

          <main className="app__main">
            <BuilderPanel />
            <PreviewPanel />
          </main>

          <ImportExport />
        </div>
      </FormProvider>
    </ErrorBoundary>
  );
}
