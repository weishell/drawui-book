import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './NotFound.module.less';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrap}>
      <div className={styles.code}>404</div>
      <div className={styles.title}>{t('notFound.title')}</div>
      <div className={styles.desc}>{t('notFound.desc')}</div>
      <Link to="/" className={styles.home}>
        {t('notFound.back')}
      </Link>
    </div>
  );
}
