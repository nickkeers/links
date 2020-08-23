#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LinksStack } from '../lib/links-stack';

const app = new cdk.App();
new LinksStack(app, 'LinksStack');
