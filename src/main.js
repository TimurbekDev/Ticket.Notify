import { Telegraf, Markup } from "telegraf";
import { makeRequest } from "./service.js";
import { processResponseJs } from "./utils.js";

const bot = new Telegraf('7701956293:AAFqVtE-XVH_M7hfzdD-XFI1_7qOgDD5thE');


bot.start((ctx) => {
    ctx.reply(
        `Poyezding juretin sa'nesin jazip jiber : \nKutilip atrg'an farmat (24.10.2003) qawislarsiz`
    );
});

bot.on('text', async (ctx) => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const inputDate = ctx.message.text.trim();
    const userId = ctx.message.from.id;

    if (!regex.test(inputDate)) {
        return ctx.reply('Duris farmat kirit : (DD.MM.YYYY)');
    }

    const [day, month, year] = inputDate.split(".");
    const date = new Date(`${year}-${month}-${day}`);
    
    if (isNaN(date) || date < new Date().setHours(0, 0, 0, 0)) {
        return ctx.reply(`Kiritilgen sa'ne o'tken zamandan bo'lmawi kerek`);
    }

    try {
        
        await ctx.reply(
            `${day}-kunine poyezddan o'rin tawilsa xabarlayman`);

        const intervalId = setInterval(async () => {
            try {
                const response = await makeRequest(inputDate);
                const freeSpaces = processResponseJs(response);

                if (Number(freeSpaces) > 0) {
                    await ctx.reply(
                        `${day}-kunge bilet shiqti, bos o'rinlar sani: ${freeSpaces}`,{
                            reply_markup: Markup.inlineKeyboard([
                                Markup.button.callback('Stop', `stop_${userId}_${intervalId}`),
                            ]).reply_markup
                        }
                    );
                }
            } catch (error) {
                console.error('Error in interval:', error);
            }
        }, 5000);

    } catch (error) {
        console.error('Main error:', error);
        await ctx.reply('Serverde qatelik...');
    }
});

bot.action(/stop_(.+)/, (ctx) => {    
    const userId = ctx.match[0].split('_');
    clearInterval(userId[2]);
    ctx.reply('Old intervals stopped.');
});

bot.catch((err, ctx) => {
    console.error(`Bot error for ${ctx.updateType}:`, err);
    ctx.reply('Qatelik juz berdi. Qaytadan urınıp ko\'rin\'.');
});

bot.launch();