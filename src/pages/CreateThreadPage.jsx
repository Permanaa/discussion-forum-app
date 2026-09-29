import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { asyncCreateThread } from '../states/threads/action';
import { useNavigate } from 'react-router-dom';

function CreateThreadPage() {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onCreateThread() {
    dispatch(
      asyncCreateThread({ title, category, body }, () => {
        navigate('/');
      }),
    );
  }

  return (
    <>
      <h2 className="page-title">Buat Diskusi</h2>
      <section className="create-thread__wrapper">
        <div className="input-wrapper">
          <label htmlFor="thread-title">Judul</label>
          <input id="thread-title" required value={title} onChange={setTitle} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="thread-category">Kategori</label>
          <input id="thread-category" value={category} onChange={setCategory} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="thread-body">Isi Diskusi</label>
          <textarea
            rows={5}
            id="thread-body"
            className="create-thread__body"
            required
            value={body}
            onChange={setBody}
          />
          {/* <div
            contentEditable
            id="thread-body"
            className="create-thread__body-input"
          />*/}
        </div>
        <button id="thread-create-button" onClick={onCreateThread}>Buat</button>
      </section>
    </>
  );
}

export default CreateThreadPage;
