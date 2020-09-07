import { Plugin } from 'webpack';

declare class HtmlWebpackPartialsPlugin extends Plugin {
    constructor(settings: HtmlWebpackPartialsPlugin.Settings | HtmlWebpackPartialsPlugin.Settings[]);
}

declare namespace HtmlWebpackPartialsPlugin {
    interface Settings {
        path: string;
        inject?: boolean;
        location?: 'head' | 'body';
        priority?: 'high' | 'low';
        template_filename?: string | string[];
        options?: unknown;
    }   
}

export = HtmlWebpackPartialsPlugin;
