#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const {
  tweeter,
  twitterConfig,
  buildVaccinationTweets,
} = require('vaccine-stats-plugin');

yargs(hideBin(process.argv)).command(
  'vaccine [ckey] [csec] [at] [ats]',
  'Publish Vaccine Stats',
  {},
  (args) => {
    if (args.ckey && args.csec && args.at && args.ats) {
      const { ckey, csec, at, ats } = args;
      const tConfig = twitterConfig(ckey, csec, at, ats);
      buildVaccinationTweets('overall')
        .then((tweets) => {
          tweeter(tConfig, tweets)
            .then(() => {
              console.log('successfully Tweeted');
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
);

if (yargs.argv._.length < 1) {
  yargs.showHelp();
}
