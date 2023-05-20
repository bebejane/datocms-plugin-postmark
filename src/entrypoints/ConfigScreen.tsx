import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, TextField, SwitchField, Form, Button, Spinner } from 'datocms-react-ui';
import { useState } from 'react';

export type Parameters = {
  postmarkServerToken: string | null
  tabLabel: string;
}

const defaultSettings = {
  postmarkServerToken: null,
  tabLabel: 'Postmark',
} as Parameters

type Props = {
  ctx: RenderConfigScreenCtx;
};

export default function ConfigScreen({ ctx }: Props) {

  const parameters = ctx.plugin.attributes.parameters as Parameters;
  const [settings, setSettings] = useState(parameters || defaultSettings)
  const [saving, setSaving] = useState(false)
  const haveChanged = JSON.stringify(parameters) !== JSON.stringify(settings)

  const saveSettings = async () => {
    setSaving(true)
    try {
      await ctx.updatePluginParameters({ ...settings });
      ctx.notice('Saved plugin settings')
    } catch (e) {
      ctx.notice(`Error saving settings: ${(e as Error).message ?? e}`)
    }
    setSaving(false)
  }

  return (
    <Canvas ctx={ctx}>
      <Form onSubmit={saveSettings}>
        <TextField
          id={'postmarkServerToken'}
          name={'postmarkServerToken'}
          label={'Postmark Server Token'}
          onChange={(value) => setSettings((prev) => ({ ...prev, postmarkServerToken: value }))}
          value={settings.postmarkServerToken ?? ''}
        />
        <TextField
          id={'tabLabel'}
          name={'tabLabel'}
          label={'Tab label'}
          onChange={(value) => setSettings((prev) => ({ ...prev, tabLabel: value }))}
          value={settings.tabLabel ?? ''}
        />
      </Form>
      <br />
      <Button disabled={!haveChanged} onClick={saveSettings} fullWidth={true}>
        {saving ? <Spinner /> : <>Save settings</>}
      </Button>
    </Canvas>
  );
}
