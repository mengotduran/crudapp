import Heading from '../atoms/Heading';
import Text from '../atoms/Text';
import './AuthTemplate.css';

export default function AuthTemplate({ eyebrow, title, subtitle, children, footer }) {
  return (
    <main className="auth-layout">
      <div className="auth-layout__brand">Taskboard</div>
      <section className="auth-layout__card">
        <header className="auth-layout__header">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <Heading level={1}>{title}</Heading>
          {subtitle && <Text muted>{subtitle}</Text>}
        </header>
        {children}
      </section>
      {footer && <div className="auth-layout__footer">{footer}</div>}
    </main>
  );
}
