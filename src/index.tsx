import React from 'react';
import ReactDOM from 'react-dom';
import { connect, IntentCtx, RenderPageCtx } from 'datocms-plugin-sdk';
import { render } from './utils/render';
import ConfigScreen from './entrypoints/ConfigScreen';
import PostmarkPage from './entrypoints/PostmarkPage';
import 'datocms-react-ui/styles.css';

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  mainNavigationTabs(ctx: IntentCtx) {
    const label = ctx.plugin.attributes.parameters.tabLabel as string

    return [
      {
        label,
        icon: 'analytics',
        pointsTo: {
          pageId: 'postmark',
        },
        placement: ['before', 'settings'],
      },
    ];
  },
  renderPage(pageId, ctx: RenderPageCtx) {
    switch (pageId) {
      case 'postmark':
        return render(<PostmarkPage ctx={ctx} />);
      default:
        return null;
    }
  },
});


function renderPage(component: React.ReactNode) {
  ReactDOM.render(
    <React.StrictMode>{component}</React.StrictMode>,
    document.getElementById('root'),
  );
}