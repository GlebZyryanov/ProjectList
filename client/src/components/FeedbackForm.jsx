import React, {useState} from 'react';
import styles from './FeedbackForm.module.css';
import axios from 'axios';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false
    });

    const [formErrors, setFormErrors] = useState({}); // Состояние для ошибок
    const [submitError, setSubmitError] = useState(null); // Состояние для общей ошибки

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Имя обязательно для заполнения';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email обязателен для заполнения';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Неправильный формат email';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Телефон обязателен для заполнения';
        }
        if (!formData.message.trim()) {
            errors.message = 'Сообщение обязательно для заполнения';
        }
        if (!formData.consent) {
            errors.consent = 'Необходимо согласиться с обработкой персональных данных';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) { // Если ошибок нет
            try {
                const response = await axios.post('https://api.test.cyberia.studio/api/v1/feedbacks', formData);
                console.log('Response:', response.data);
                // Обработка успешного ответа
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    setSubmitError('Ошибка валидации данных. Пожалуйста, проверьте введенные данные.');
                    setFormErrors(error.response.data.errors); //  ошибки валидации от сервера
                } else {
                    setSubmitError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.Container}>
            <div className={styles.TitleContainer}>
                <div className={styles.Title}>
                    <div>Расскажите</div>
                    <span>о вашем проекте:</span>
                </div>
            </div>

            {submitError && <div className={styles.Error}>{submitError}</div>} {/* Общая ошибка */}

            <div className={styles.Forms}>
                <div className={styles.Subtract}>
                    <div className={styles.Subtitle}>Ваше имя*</div>
                    <input className={styles.Input}
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           required
                    />
                    {formErrors.name && <div className={styles.Error}>{formErrors.name}</div>} {/* Ошибка имени */}
                </div>

                <div className={styles.Subtract}>
                    <div className={styles.Subtitle}>Email*</div>
                    <input className={styles.Input}
                           name="email"
                           type="email"
                           value={formData.email}
                           onChange={handleChange}
                           required
                    />
                    {formErrors.email && <div className={styles.Error}>{formErrors.email}</div>} {/* Ошибка email */}
                </div>

                <div className={styles.Subtract}>
                    <div className={styles.Subtitle}>Телефон*</div>
                    <input className={styles.Input}
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           required
                    />
                    {formErrors.phone && <div className={styles.Error}>{formErrors.phone}</div>} {/* Ошибка телефона */}
                </div>

                <div className={styles.Subtract}>
                    <div className={styles.Subtitle}>Сообщение*</div>
                    <input className={styles.Input}
                           name="message"
                           value={formData.message}
                           onChange={handleChange}
                           required
                    />
                    {formErrors.message && <div className={styles.Error}>{formErrors.message}</div>} {/* Ошибка сообщения */}
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
                <label htmlFor="customCheckbox" className={styles.CheckboxLabel}>
                    Согласие на обработку персональных данных
                </label>
                {formErrors.consent && <div className={styles.Error}>{formErrors.consent}</div>} {/* Ошибка согласия */}
            </div>

            <button type="submit" className={styles.Button}>Обсудить проект</button>
        </form>
    );
};

export default FeedbackForm;

// import React, {useState} from 'react';
// import styles from './FeedbackForm.module.css'
// import axios from 'axios';
// const FeedbackForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         message: '',
//         consent: false
//     });
//
//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log('Form submitted!!!!!!!!');
//         try {
//             const response = await axios.post('https://api.test.cyberia.studio/api/v1/feedbacks', formData);
//             console.log('!!!!!!!!!!!!!Response:', response.data);
//             // Обработка успешного ответа
//         } catch (error) {
//             console.error('Error!!!!!!!!!:', error);
//             // Обработка ошибки
//         }
//     };
//     return (
//         <form onSubmit={handleSubmit} className={styles.Container}>
//             <div className={styles.Title}>
//                 <div>Расскажите</div>
//                 <span>о вашем проекте:</span>
//             </div>
//             <div className={styles.Forms}>
//                 <div className={styles.Subtract}>
//                     <div className={styles.Subtitle}>
//                         Ваше имя*
//                     </div>
//                     <input className={styles.Input}
//                            name="name"
//                            value={formData.name}
//                            onChange={handleChange}
//
//                            required
//                     />
//                 </div>
//                 <div className={styles.Subtract}>
//                     <div className={styles.Subtitle}>
//                         Email*
//                     </div>
//                     <input className={styles.Input}
//                            name="email"
//                            type="email"
//                            value={formData.email}
//                            onChange={handleChange}
//
//                            required
//                     />
//                 </div>
//                 <div className={styles.Subtract}>
//                     <div className={styles.Subtitle}>
//                         Телефон*
//                     </div>
//                     <input className={styles.Input}
//                            name="phone"
//                            value={formData.phone}
//                            onChange={handleChange}
//
//                            required
//                     />
//                 </div>
//                 <div className={styles.Subtract}>
//                     <div className={styles.Subtitle}>
//                         Сообщение*
//                     </div>
//                     <input className={styles.Input}
//                            name="message"
//                            value={formData.message}
//                            onChange={handleChange}
//
//                            required
//                     />
//
//                 </div>
//             </div>
//             <div className={styles.CheckboxContainer}>
//                 <input
//                     type="checkbox"
//                     id="customCheckbox"
//                     name="consent"
//                     checked={formData.consent}
//                     onChange={handleChange}
//                     className={styles.CheckboxInput}
//                     required
//                 />
//                 <label htmlFor="customCheckbox" className={styles.CheckboxLabel}>Согласие на обработку персональных данных</label>
//             </div>
//             <button type="submit" className={styles.Button}>Обсудить проект</button>
//         </form>
//     );
// };
//
// export default FeedbackForm;