import { useState } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { useNavigate } from 'react-router-dom';

const NewQuestion = (props) => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(handleAddQuestion(optionOneText, optionTwoText));
    navigate('/');
  };

  return (
    <div className="card question-panel">
      <header className="card-header">
        <p className="card-header-title">Create a New Question</p>
      </header>
      <div className="card-content">
        <p>Would you rather...</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Option One</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="optionOneText"
                value={optionOneText}
                onChange={(e) => setOptionOneText(e.target.value)}
                placeholder="Enter option one text here"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Option Two</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="optionTwoText"
                value={optionTwoText}
                onChange={(e) => setOptionTwoText(e.target.value)}
                placeholder="Enter option two text here"
              />
            </div>
          </div>
          <div className="control">
            <button className="button is-dark is-fullwidth" type="submit" disabled={!optionOneText || !optionTwoText}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect()(NewQuestion);