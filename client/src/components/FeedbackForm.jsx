import React, {useState} from 'react';
import styles from './FeedbackForm.module.css'
import axios from 'axios';
const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted!!!!!!!!');
        try {
            const response = await axios.post('https://api.test.cyberia.studio/api/v1/feedbacks', formData);
            console.log('!!!!!!!!!!!!!Response:', response.data);
            // Обработка успешного ответа
        } catch (error) {
            console.error('Error!!!!!!!!!:', error);
            // Обработка ошибки
        }
    };
    return (
        <form onSubmit={handleSubmit} className={styles.Container}>
            <div className={styles.Title}>
                <div>Расскажите</div>
                <span>о вашем проекте:</span>
            </div>
            <div className={styles.Forms}>
                <div className={styles.Subtract}>
                    <div className={styles.Subtitle}>
                        Ваше имя*
                    </div>
                    <input className={styles.Input}
                           name="name"
                           value={formData.name}
                           onChange={handleChange}

                           required
                    />
                </div>
                <div className={styles.Subtract}>
                    <div className={styles.Subtitle}>
                        Email*
                    </div>
                    <input className={styles.Input}
                           name="email"
                           type="email"
                           value={formData.email}
                           onChange={handleChange}

                           required
                    />
                </div>
                <div className={styles.Subtract}>
                    <div className={styles.Subtitle}>
                        Телефон*
                    </div>
                    <input className={styles.Input}
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}

                           required
                    />
                </div>
                <div className={styles.Subtract}>
                    <div className={styles.Subtitle}>
                        Сообщение*
                    </div>
                    <input className={styles.Input}
                           name="message"
                           value={formData.message}
                           onChange={handleChange}

                           required
                    />

                </div>
            </div>
            <div className={styles.CheckboxContainer}>
                <input
                    type="checkbox"
                    id="customCheckbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className={styles.CheckboxInput}
                    required
                />
                <label htmlFor="customCheckbox" className={styles.CheckboxLabel}>Согласие на обработку персональных данных</label>
            </div>
            <button type="submit" className={styles.Button}>Обсудить проект</button>
        </form>
    );
};

export default FeedbackForm;