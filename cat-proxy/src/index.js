/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env) {
    const API_KEY = "live_Eayfy2PU2NgpO8TdsyTorf4iNdZrz1MtmGWVDIFnZcNNorJTcXzRQeLQtXo3vaiT";
    const resp = await fetch("https://api.thecatapi.com/v1/images/search", {
      headers: { "x-api-key": API_KEY }
    });
    const data = await resp.json();
    return new Response(JSON.stringify({ url: data[0].url }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
