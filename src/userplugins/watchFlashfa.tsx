/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import type { Component } from "react";

interface Props {
    embed: {
        url: string;
        yes: boolean;

        type: string;
        provider?: {
            name: string;
            url: string;
        };
        video?: {
            url: string;
            width: number;
            height: number;
            aspectRatio: number;
            allowFullscreen: boolean;
            allowPictureInPicture: boolean;
            autoplay: boolean;
            controls: boolean;
            loop: boolean;
            muted: boolean;
            playsinline: boolean;
        };
    };
}


async function embedDidMount(this: Component<Props>) {
    const { embed } = this.props;
    if (!embed || !embed.url.startsWith("https://zyrok.hoppy.ovh/")) {
        return;
    }
    console.log(embed);
    embed.yes = true;
    embed.type = "video";
    // embed.provider = {
    //     "name": "YouTube",
    //     "url": "https://www.youtube.com"
    // };
    embed.video = {
        "url": embed.url,
        "width": 640,
        "height": 360,
        "aspectRatio": 1.7777777777777777,
        "allowFullscreen": true,
        "allowPictureInPicture": true,
        "autoplay": true,
        "controls": true,
        "loop": false,
        "muted": false,
        "playsinline": false
    };

    this.forceUpdate();
}


function WatchFrame({ component }: { component: Component<Props>; }) {
    const { embed } = component.props;
    console.log("oui", embed);

    // if (!embed || !embed.url.startsWith("https://zyrok.hoppy.ovh/")) {
    //     return null;
    // }

    return (
        null
        // <iframe
        //     src={embed.url}
        //     style={{ width: "100%", height: "100%" }}
        //     title="Dearrow Button"
        //     allowFullScreen
        //     className="vencord-embed"
        // />
    );
}

export default definePlugin({
    name: "Watch FlashFA",
    description: "Watch",
    authors: [Devs.Ven],

    embedDidMount,
    // renderButton(component: Component<Props>) {
    //     return (
    //         <ErrorBoundary noop>
    //             <WatchFrame component={component} />
    //         </ErrorBoundary>
    //     );
    // },

    patches: [
        // {
        //     find: ".embedWrapper,embed",
        //     replacement: [
        //         {
        //             match: /render\(\)\{.{0,30}let\{embed:/,
        //             replace: "componentDidMount=$self.embedDidMount;$&"
        //         },
        //         {
        //             match: /\.container/,
        //             replace: "componentDidMount=$self.embedDidMount;$&"
        //         }
        //     ]
        // },
        {
            find: "this.renderInlineMediaEmbed",
            replacement: [
                {
                    match: /render\(\)\{.{0,30}let\{embed:/,
                    replace: "componentDidMount=$self.embedDidMount;$&"
                },
                // add frame
                // {
                //     match: /children:\[(?=null!=\i\?(\i)\.renderSuppressButton)/,
                //     replace: "children:[$self.renderButton($1),",
                // }
            ]
        }
    ],
});
