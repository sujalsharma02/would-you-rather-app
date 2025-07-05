import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { handleAddAnswer } from '../actions/questions';
import { useState } from 'react';
import Page404 from './Page404';

const QuestionPage = (props) => {
    const { question, author, authedUser, dispatch } = props;
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    if (!question) {
        return <Page404 />;
    }

    const hasAnswered = Object.keys(author.answers).includes(question.id);

    const handleVote = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer({
            authedUser: authedUser,
            qid: question.id,
            answer: selectedOption
        }));
        // No need to navigate, component will re-render with results
    }

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePercentage = totalVotes > 0 ? ((optionOneVotes / totalVotes) * 100).toFixed(1) : 0;
    const optionTwoPercentage = totalVotes > 0 ? ((optionTwoVotes / totalVotes) * 100).toFixed(1) : 0;
    
    const userAnswer = author.answers[question.id];

    return (
        <div className="card question-panel">
            <header className="card-header">
                <p className="card-header-title">
                    {hasAnswered ? `Asked by ${author.name}` : `${author.name} asks:`}
                </p>
            </header>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-128x128">
                            <img className="is-rounded" src={author.avatarURL} alt={`Avatar of ${author.name}`} />
                        </figure>
                    </div>
                    <div className="media-content">
                        {hasAnswered ? (
                            <div>
                                <h3 className="title is-4">Results:</h3>
                                <div className={`notification ${userAnswer === 'optionOne' ? 'is-primary' : ''}`}>
                                    {userAnswer === 'optionOne' && <span className="tag is-dark">Your Vote</span>}
                                    <p>Would you rather {question.optionOne.text}?</p>
                                    <progress className="progress is-link" value={optionOnePercentage} max="100">{optionOnePercentage}%</progress>
                                    <p className="has-text-weight-bold">{optionOneVotes} out of {totalVotes} votes ({optionOnePercentage}%)</p>
                                </div>
                                <div className={`notification ${userAnswer === 'optionTwo' ? 'is-primary' : ''}`}>
                                    {userAnswer === 'optionTwo' && <span className="tag is-dark">Your Vote</span>}
                                    <p>Would you rather {question.optionTwo.text}?</p>
                                    <progress className="progress is-link" value={optionTwoPercentage} max="100">{optionTwoPercentage}%</progress>
                                    <p className="has-text-weight-bold">{optionTwoVotes} out of {totalVotes} votes ({optionTwoPercentage}%)</p>
                                </div>
                                 <button onClick={() => navigate('/')} className="button is-light">Back</button>
                            </div>
                        ) : (
                            <form onSubmit={handleVote}>
                                <h3 className="title is-4">Would you rather...</h3>
                                <div className="control">
                                    <label className="radio">
                                        <input type="radio" name="answer" value="optionOne" onChange={(e) => setSelectedOption(e.target.value)} />
                                        {' '}{question.optionOne.text}
                                    </label>
                                </div>
                                <div className="control">
                                    <label className="radio">
                                        <input type="radio" name="answer" value="optionTwo" onChange={(e) => setSelectedOption(e.target.value)} />
                                        {' '}{question.optionTwo.text}
                                    </label>
                                </div>
                                <button className="button" type="submit" disabled={!selectedOption} style={{marginTop: '1rem'}}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
    const { id } = useParams();
    const question = questions[id];
    const author = question ? users[question.author] : null;

    return {
        authedUser,
        question,
        author: users[authedUser] // for getting user's answers
    };
};

export default connect(mapStateToProps)(QuestionPage);