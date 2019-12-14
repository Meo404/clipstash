import React, { useState } from 'react';
import { ApiClient } from 'ApiClient';
import { validateReason } from 'utils/UserValidation';
import { Modal, ReportSubmissionForm } from 'components';

const INITIAL_STATE = {
    reason: '',
    hasErrors: false,
    isSubmitting: false,
    error: null
}

export default function ReportSubmissionModal(props) {
    const {
        showReportSubmission,
        showReportSubmissionHandler,
        showReportSubmissionSuccessHandler,
        reportSubmissionFullname
    } = props;
    const [formData, setFormData] = useState(INITIAL_STATE);
    const client = new ApiClient();

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    /**
     * Handler for the form submit
     * 
     * It will first check if there are any FE validation errors before reaching out
     * to the report submission endpoint.
     * 
     * @param {object} event 
     */
    function submitHandler(event) {
        event.preventDefault();
        const validatedReason = validateReason(formData.reason);

        if (validatedReason != null) {
            setFormData({ ...formData, hasErrors: true, error: validatedReason, isSubmitting: false });
            return;
        }

        setFormData({ ...formData, hasErrors: false, error: null, isSubmitting: true });
        reportSubmission();
    }

    async function reportSubmission() {
        const params = {
            reason: formData.reason,
            submission_fullname: reportSubmissionFullname,
        };

        // TODO add proper error handling for generic errors
        await client.post('api/v1/report_submission', params)
            .then(() => {
                showReportSubmissionSuccessHandler();
                setFormData(INITIAL_STATE);
            })
            .catch((error) => {
                if (error.response.status == 400 && error.response.data.errors.submission_fullname) {
                    setFormData({
                        ...formData,
                        error: 'Content was already reported by your account',
                        hasErrors: true,
                        isSubmitting: false
                    });
                    return;
                }

                if (error.response.status == 401) {
                    setFormData({ 
                        ...formData,
                        error: 'You need to have an account and be logged in to report content',
                        hasErrors: true,
                        isSubmitting: false
                    });
                    return;
                }
                
                setFormData({ ...formData, error: 'An error occured, please try again', hasErrors: true, isSubmitting: false });
            })
    }

    return (
        <Modal
            showModal={showReportSubmission}
            showModalHandler={showReportSubmissionHandler}
        >
            <ReportSubmissionForm
                formData={formData}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </Modal>
    )
}