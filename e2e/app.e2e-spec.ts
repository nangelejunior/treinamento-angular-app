import { TreinamentoAngularAppPage } from './app.po';

describe('treinamento-angular-app App', function() {
  let page: TreinamentoAngularAppPage;

  beforeEach(() => {
    page = new TreinamentoAngularAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
