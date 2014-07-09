import azure_translate_api
from ghost import Ghost
ghost = Ghost()

client = azure_translate_api.MicrosoftTranslatorClient('Gibberish-ID', '4YXi3g5y0n+q2JIkSy4w1KSDgT76yiIgAwNy1/ztIjk=')
print client.TranslateText('Eat my head', 'en', 'fr')