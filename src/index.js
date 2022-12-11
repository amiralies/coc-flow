// @flow
import { LanguageClient, workspace, services } from 'coc.nvim';
import fs from 'fs';
import path from 'path';

type Config = {|
  +enable: boolean,
  +pathToFlow: string,
  +useNPMPackagedFlow: boolean,
  +stopFlowOnExit: boolean,
  +lazyMode: '' | 'fs' | 'watchman' | 'ide' | 'none',
|};

const getFlowCommand = (config: Config): string => {
  const defaultFlowBinPath = path.join(workspace.rootPath, 'node_modules', '.bin', 'flow');
  if (config.useNPMPackagedFlow && fs.existsSync(defaultFlowBinPath)) {
    return defaultFlowBinPath;
  }

  return config.pathToFlow;
};

const getFlowArgs = (config: Config): Array<string> => {
  const lsp = ['lsp'];
  const autoStop = config.stopFlowOnExit ? ['--autostop'] : [];
  const lazyMode = config.lazyMode.length > 0 ? ['--lazy-mode', config.lazyMode] : [];
  return [lsp, autoStop, lazyMode].reduce((prev, argSet) => [...prev, ...argSet], []);
};

export function activate(context: Object) {
  const flowConfigPath = path.join(workspace.rootPath, '.flowconfig');
  const config: Config = workspace.getConfiguration().get('flow', {});

  if (!fs.existsSync(flowConfigPath) || config.enable === false) {
    return;
  }

  const command = getFlowCommand(config);
  const args = getFlowArgs(config);
  const serverOptions = { command, args };

  const documentSelector = ['javascript', 'javascriptreact'].reduce(
    (prev, language) => [...prev, { language, scheme: 'file' }, { language, scheme: 'untitled' }],
    [],
  );

  const clientOptions = {
    documentSelector,
  };

  const languageClient = new LanguageClient('flow', 'Flow', serverOptions, clientOptions);
  context.subscriptions.push(services.registLanguageClient(languageClient));
}
