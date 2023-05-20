import s from './PostmarkPage.module.scss';
import { RenderPageCtx } from 'datocms-plugin-sdk';
import { Canvas, Spinner } from 'datocms-react-ui';
import { useEffect, useState } from 'react';
import { postmark } from '../utils/api';
import { Parameters } from './ConfigScreen';

type PropTypes = {
  ctx: RenderPageCtx,
};

export default function PostmarkPage({ ctx }: PropTypes) {

  const parameters = ctx.plugin.attributes.parameters as Parameters;
  const apiToken = parameters.postmarkServerToken
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[] | null>(null)

  const fetchMessages = async () => {
    if (typeof apiToken !== 'string') return

    setLoading(true)
    try {
      const res = await postmark.messages(apiToken)
      setMessages(res as Message[])
      console.log(res)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [apiToken])

  return (
    <Canvas ctx={ctx}>
      <main className={s.container}>
        <h3>Messages</h3>
        {loading ? <Spinner />
          :
          <ul>
            {messages?.map((message) =>
              <li key={message.MessageID}>
                <h4>{message.Subject}</h4>
                <span>{message.To[0].Email}</span>
                <span>{message.Subject}</span>
              </li>
            )}
          </ul>
        }
      </main>
    </Canvas>
  );
}