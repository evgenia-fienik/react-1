import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import {useId} from 'react';

import css from './ContactForm.module.css'


export default function ContactForm({onAdd}) {
    const nameId = useId();
    const numberId = useId();

    const initialValues = {
      name: '',
      number: ''
    }
    const handleSubmit = (values, actions) => {
        onAdd(values);
        actions.resetForm()
    }

    const FeedbackSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(50, "Too Long!").required('Requare'),
        number: Yup.string().min(2, 'Too Short!').max(50, "Too Long!").required('Requare'),
    });

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            <Form className={css.container}>
                <div className={css.name}>
                    <label htmlFor ={nameId}>Name</label>
                    <Field className={css.input} type='text' name='name' id={nameId} />
                    <ErrorMessage name='name' component='span' className={css.error} />
                </div>
                <div className={css.number}>
                     <label htmlFor ={numberId}>Number</label>
                    <Field className={css.input} type='tel' name='number' id={numberId} />
                    <ErrorMessage name='number' component='span' className={css.error} />
                </div>
                <button className={css.btn }type='submit'>Add contact</button>
            </Form>
        </Formik>
    )

}