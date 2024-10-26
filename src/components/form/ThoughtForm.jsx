import PropTypes from "prop-types"
import "./form.css"
import { SubmitButton } from "./submitButton/SubmitButton"
import { CharacterCounter } from "./characterCounter/CharacterCounter"
import { useState } from "react"

export const ThoughtsForm = ({ newThought, setNewThought, handleFormSubmit }) => {
    const maxChars = 140
    const minChars = 5
    const [error, setError] = useState("")

    const handleInputChange = (e) => {
        setNewThought(e.target.value)
        setError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validation checks
        if (newThought.length === 0) {
            setError("The message cannot be empty.");
        } else if (newThought.length < minChars) {
            setError(`The message must be at least ${minChars} characters.`);
        } else if (newThought.length > maxChars) {
            setError(`The message cannot exceed ${maxChars} characters.`);
        } else {
            setError("")
            handleFormSubmit(e)
            setNewThought("")
        }
    }

    return (
        <>
            <div className="form-container">
                <p>What is making you happy right now?</p>
                <form onSubmit={handleSubmit}>
                    <textarea
                        type="text"
                        value={newThought}
                        onChange={handleInputChange}
                        placeholder="Type here..."
                        maxLength="maxChars">
                    </textarea>
                    <section className="counter-container">
                        <CharacterCounter currentLength={newThought.length} maxChars={maxChars} />
                    </section>
                    {error && <p className="error-message">{error}</p>}
                    <section className="submit-button-container">
                        <SubmitButton />
                    </section>
                </form>
            </div>

        </>
    )
}

// Props Validation

ThoughtsForm.propTypes = {
    newThought: PropTypes.string.isRequired,
    setNewThought: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
}