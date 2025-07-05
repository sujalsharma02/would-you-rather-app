import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const QuestionSummary = ({ question, author }) => (
    <div className="card question-panel" style={{ margin: '1rem auto'}}>
        <header className="card-header">
            <p className="card-header-title">{author.name} asks:</p>
        </header>
        <div className="card-content">
            <div className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img className="is-rounded" src={author.avatarURL} alt={`Avatar of ${author.name}`} />
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-4">Would you rather...</p>
                    <p className="subtitle is-6">...{question.optionOne.text.substring(0, 15)}...</p>
                    <Link to={`/questions/${question.id}`} className="button is-outlined is-fullwidth">
                        View Poll
                    </Link>
                </div>
            </div>
        </div>
    </div>
)

const HomeTabs = (props) => {
  const [activeTab, setActiveTab] = useState('unanswered');
  const { answeredQuestions, unansweredQuestions, users } = props;

  const questionsToShow = activeTab === 'unanswered' ? unansweredQuestions : answeredQuestions;

  return (
    <div>
      <div className="tabs is-centered">
        <ul>
          <li className={activeTab === 'unanswered' ? 'is-active' : ''}>
            <a onClick={() => setActiveTab('unanswered')}>Unanswered Questions</a>
          </li>
          <li className={activeTab === 'answered' ? 'is-active' : ''}>
            <a onClick={() => setActiveTab('answered')}>Answered Questions</a>
          </li>
        </ul>
      </div>
      <div>
        {questionsToShow.map((question) => (
            <QuestionSummary key={question.id} question={question} author={users[question.author]}/>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => {
  const user = users[authedUser];
  const answeredQids = Object.keys(user.answers);

  const answeredQuestions = Object.values(questions)
    .filter((q) => answeredQids.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const unansweredQuestions = Object.values(questions)
    .filter((q) => !answeredQids.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    answeredQuestions,
    unansweredQuestions,
    users,
  };
};

export default connect(mapStateToProps)(HomeTabs);