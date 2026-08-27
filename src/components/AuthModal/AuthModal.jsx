import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './AuthModal.module.css'; // შენი CSS ფაილის იმპორტი

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>✕</button>
        <h2 className={styles.title}>{isLogin ? 'სისტემაში შესვლა' : 'რეგისტრაცია'}</h2>
        
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>ელ-ფოსტა</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>პაროლი</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'შესვლა' : 'რეგისტრაცია'}
          </button>
        </form>

        <div className={styles.footer}>
          {isLogin ? 'არ გაქვს ექაუნთი?' : 'უკვე გაქვს ექაუნთი?'}{' '}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            className={styles.switchBtn}
          >
            {isLogin ? 'დარეგისტრირდი' : 'შედი სისტემაში'}
          </button>
        </div>
      </div>
    </div>
  );
}