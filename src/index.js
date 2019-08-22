// @flow
import { LanguageClient, workspace, services, ExtensionContext } from 'coc.nvim';
import fs from 'fs';
import path from 'path';

type Config = {|
  +enable: boolean,
  +pathToFlow: string,
  +useNPMPackagedFlow: boolean,
  +stopFlowOnExit: boolean,
|};

const getFlowCommand = (config: Config): string => {
  const defaultFlowBinPath = path.join(workspace.rootPath, 'node_modules', '.bin', 'flow');
  if (config.useNPMPackagedFlow && fs.existsSync(defaultFlowBinPath)) {
    return defaultFlowBinPath;
  }

  return config.pathToFlow;
};

const getFlowArgs = (config: Config): Array<string> => ['lsp', ...(config.stopFlowOnExit ? ['--autostop'] : [])];

export function activate(context: ExtensionContext) {
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
