// @flow
import { LanguageClient, workspace, services, ExtensionContext } from 'coc.nvim';
import fs from 'fs';
import path from 'path';

exports.activate = (context: ExtensionContext) => {
  const flowConfigPath = path.join(workspace.rootPath, '.flowconfig');
  const flowBinPath = path.join(workspace.rootPath, 'node_modules', '.bin', 'flow');

  if (!fs.existsSync(flowConfigPath)) {
    return;
  }

  const command = flowBinPath;
  const serverOptions = { command, args: ['lsp'] };

  const documentSelector = ['javascript', 'javascriptreact'].reduce(
    (prev, language) => [...prev, { language, scheme: 'file' }, { language, scheme: 'untitled' }],
    [],
  );

  const clientOptions = {
    documentSelector,
  };

  const languageClient = new LanguageClient('flow', 'Flow', serverOptions, clientOptions);
  context.subscriptions.push(services.registLanguageClient(languageClient));
};
