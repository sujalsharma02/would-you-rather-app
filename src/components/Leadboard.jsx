import { connect } from 'react-redux';

const Leadboard = (props) => {
  const { users } = props;

  const sortedUsers = Object.values(users).sort((a, b) => {
    const scoreA = Object.keys(a.answers).length + a.questions.length;
    const scoreB = Object.keys(b.answers).length + b.questions.length;
    return scoreB - scoreA;
  });

  return (
    <div className="card leadboard-panel">
      <header className="card-header">
        <p className="card-header-title">Leadboard</p>
      </header>
      <div className="card-content">
        {sortedUsers.map((user) => {
          const answeredCount = Object.keys(user.answers).length;
          const createdCount = user.questions.length;
          const score = answeredCount + createdCount;

          return (
            <div key={user.id} className="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img className="is-rounded" src={user.avatarURL} alt={`Avatar of ${user.name}`} />
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{user.name}</strong>
                    </p>
                    <ul className="list leadboard-stats">
                        <li className="list-item">
                            <span>Answered questions</span>
                            <span>{answeredCount}</span>
                        </li>
                        <li className="list-item">
                            <span>Created questions</span>
                            <span>{createdCount}</span>
                        </li>
                    </ul>
                  </div>
                </div>
                <div className="media-right">
                    <div className="score-panel">
                        {score}
                    </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Leadboard);