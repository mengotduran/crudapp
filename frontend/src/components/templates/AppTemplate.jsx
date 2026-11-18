import Navbar from '../organisms/Navbar';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';
import './AppTemplate.css';

export default function AppTemplate({
  eyebrow,
  title,
  subtitle,
  actions,
  back,
  narrow = false,
  children,
}) {
  return (
    <div className="app-layout">
      <Navbar />
      <main className={`app-layout__main ${narrow ? 'app-layout__main--narrow' : ''}`}>
        {back && <div className="app-layout__back">{back}</div>}
        <header className="app-layout__header">
          <div className="app-layout__titles">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <Heading level={1}>{title}</Heading>
            {subtitle && <Text muted>{subtitle}</Text>}
          </div>
          {actions && <div className="app-layout__actions">{actions}</div>}
        </header>
        {children}
      </main>
    </div>
  );
}
