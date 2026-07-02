---
name: travel-budget-planner
description: Build priced travel itineraries, option boards, visual references, and total budgets from a city, country, region, or destination request. Use when the user asks for travel planning, vacation攻略, itinerary, route planning, flights, hotels, restaurants, attractions, shopping malls, towns, amusement parks, scenic areas, restaurants, photos, or trip budgets; especially when the user gives only a destination and expects Codex to ask for travelers, companions, duration, dates, and each traveler departure city before planning.
---

# Travel Budget Planner

## Overview

Use this skill to turn a destination into a practical travel plan with itemized prices and a final total budget. Default to Chinese unless the user asks otherwise.

## Required Intake

If the user has not provided all required trip inputs, ask for the missing items before producing the full plan:

- 旅行人数
- 和谁一起旅行（例如家人、情侣、朋友、同事、独自；如有老人/儿童/行动限制也询问）
- 旅行天数
- 具体旅行日期或可接受日期范围
- 每个人的出发地（城市和机场偏好，如有）

Do not require the user to provide a budget. If the user gives a budget, plan around it. If no budget is given, default to three useful tiers: 舒适性价比, 中档, 高档. Avoid a bare-bones "low budget" tier unless the user explicitly asks for the cheapest possible trip.

If only the destination is given, ask one concise grouped question covering the missing required items. Do not draft a full itinerary until these are known. If the user refuses or is unsure about some fields, state the assumptions clearly and continue with an estimate.

## Research Requirements

Use current web research whenever planning flights, hotels, restaurants, attractions, ticket prices, opening hours, transportation passes, exchange rates, seasonal constraints, visa rules, or anything likely to change. Prefer official sites and reputable booking/travel sources. Include source links for key prices and time-sensitive claims.

When exact prices are unavailable, use a realistic range and label it as an estimate. Note the search date when prices may fluctuate.

Double-check prices, locations, and availability before presenting final budgets. For each major budget driver, verify against at least two reasonable signals when possible: official site, booking platform, map listing, current menu, ticket page, flight search, hotel listing, or recent reputable travel source. If sources disagree, use a range, explain the uncertainty, and avoid presenting the number as exact.

For hotels, prioritize each hotel's official website or official booking engine for rates. Do not rely only on general search snippets. If official hotel pricing is unavailable, clearly label the price as a third-party or estimated rate and recommend rechecking the official site before booking.
When recommending hotel areas, first check how a major booking/search site such as KAYAK, Booking, Expedia, or Ctrip names and filters the destination's neighborhoods. Present search guidance using the actual neighborhood/filter names visible on the user's booking site, then explain the practical location tradeoff. Do not give only broad agent-created labels that the user cannot easily search.

For flights, provide concrete flight candidates whenever dates and departure cities are known. Prioritize airline official sites, Google Flights, or reputable flight search pages for schedules and fare ranges. Include airline, flight number when available, departure/arrival airports, local departure time, local arrival time, dates, duration, nonstop/layover status, fare class or baggage caveat, price source, and pros/cons. Do not present a flight as a selectable candidate if it only says "morning", "evening", or "red-eye" without clock times. If exact clock times, fares, or flight numbers are unavailable, label the option as "待官网确认" and use it only as a planning placeholder, not as a selectable final flight.
For city pairs with nonstop service, default to nonstop flights first. Clearly label each option as `直飞` or `中转`. Do not imply a flight is connecting when nonstop options exist. Include connecting flights only as a separate budget-saving backup, and explain the time tradeoff.

Use image search or official photo pages when the user asks for images, visual references, or when images would materially help choose hotels, restaurants, or attractions. Prefer representative, inspectable images over decorative stock images. Include a small set of images or image links in the option board; do not overload the final itinerary with too many images.

For amusement parks and ticketed experiences, verify the exact ticket product before budgeting: whether it is all-day or timed, unlimited or credit-based, which rides/experiences are excluded, and whether the official ticket page conflicts with the checkout page. If there is ambiguity, budget using the user's known checkout price when provided and clearly say final terms must follow checkout.

## Planning Workflow

1. Confirm the trip profile in one short summary: destination, travelers, dates, duration, departure cities, budget, and style.
2. Create an option board before the final itinerary:
   - List a broad set of viable attractions and experiences for the destination, grouped by type such as landmarks, museums, scenic areas, shopping, towns/day trips, amusement parks, local neighborhoods, nightlife, and relaxed couple-friendly spots.
   - Before showing the option board, do an explicit omissions check. Re-scan the destination for easy-to-miss but representative categories, including beach amusement/piers, major theme parks, small towns/day trips, shopping malls/markets, scenic viewpoints, signature museums, historic landmarks, nightlife/date-night areas, local neighborhoods, seasonal events, and iconic food streets. Add any missing high-signal option before asking the user to choose.
   - For coastal cities, always check piers, boardwalks, beach amusement parks, harbor activities, sunset viewpoints, and nearby beach towns. For Los Angeles specifically, include Santa Monica Pier/Pacific Park when relevant unless there is a clear reason not to.
   - Include price, estimated time needed, location/area, reservation need, crowd/effort level, and a short "适合/不适合" note for each option.
   - Include visual references when useful, especially for hotels, restaurants, scenic spots, amusement parks, and towns.
   - Present attractions with numbers, hotels with uppercase letters, restaurants with lowercase letters, and flight/budget choices with short labels. Do not use Markdown checkboxes by default because they are not clickable in chat.
   - Ask the user to reply in a compact format, such as `景点 1,2,4；酒店 B；航班 F1`.
   - Do not require the user to say `生成`, `算`, or `继续` once the core choices are clear.
   - When the user has selected attractions, a hotel, and a flight or flight preference, automatically run the feasibility check and produce the full itinerary if it fits.
   - If the hotel decision is ambiguous, ask one short confirmation such as `酒店就定这家吗？如果是，我直接生成最终版。` Once the user replies with `就这个`, `定这家`, `ok`, or equivalent, generate automatically.
   - After producing a full itinerary, ask whether the user is satisfied with this version. If the user is satisfied, ask whether to export it as a document.
   - If the user says `你帮我选，生成`, choose a balanced route based on time, geography, and traveler type, then run the selection feasibility check before finalizing.
   - After the user selects items, validate the selection count and timing before generating the final itinerary:
     - If too many selected items cannot fit the trip, state that it cannot fit, give the exact number of items to remove, reproduce all currently selected items with their original simple codes, and ask the user to remove items before finalizing.
     - If selected items can fit but the schedule is tight, say clearly that it is tight, identify the pressure points, and offer a more relaxed alternative.
     - If selected attractions are too few for the trip length, say how many more items to add or offer filler options such as cafes, scenic walks, shopping, rest blocks, or flexible backup stops.
     - Account for transit time, opening hours, meal duration, check-in/out, airport buffers, and realistic rest time when judging whether items fit.
   - When asking the user to revise an overfull selection, reproduce all currently selected options with the same simple codes rather than checkboxes.
3. Check feasibility: weather/seasonality, visa or entry notes when relevant, major holiday crowding, and whether the budget tiers are realistic.
4. Build transport:
   - Round-trip or multi-city flights for each departure city.
   - Calculate airfare only for travelers who actually need to fly. If one traveler already lives at or near the destination, set that traveler's airfare to $0 and do not multiply flight cost by the full group size.
   - When travelers depart from different cities, show flight subtotals by traveler/departure city.
   - Present multiple concrete flight options for each flying traveler when feasible, especially when the user cares about arrival/departure time. Include at least 2-4 flight options across value, best timing, and comfort when available.
   - For each flight option, show airline, flight number if available, airports, exact local date and clock time for departure and arrival, duration, nonstop/layover, fare estimate, price/source confidence, and pros/cons.
   - Do not use vague time labels as final options. Replace "early flight" with a concrete time such as "06:30 JFK -> 09:42 LAX" or clearly mark it as "待官网确认".
   - For routes with nonstop service, list nonstop options before any connecting options. If including a connecting option, label it as `中转备选` and state why it may or may not be worth it.
   - Prefer options that maximize usable time at the destination when the user asks to spend more time together, such as early arrival and late/red-eye return.
   - Local airport transfer and intercity transit where useful.
   - Show price per person and subtotal.
5. Build lodging:
   - Recommend specific hotel names and their exact neighborhood/address area for each budget tier whenever possible; do not only list broad areas.
   - Base hotel-area recommendations on the user's selected attractions, companion schedule, airport plan, and evening return convenience. Then map recommended areas to the booking site's actual visible filters. If the available filters are narrow, provide a first-priority group, an acceptable expansion group, and an avoid-unless-cheap group so the user has enough inventory to compare.
   - Include multiple comparable hotels within the same tier so the user is not boxed into one option. Aim for at least 3 hotel choices per tier, and at least 8-12 total hotel choices across tiers for major cities or short city trips, unless the destination/dates make that impractical.
   - For the 舒适性价比 tier, include at least 4 hotel choices when possible. Cover a wider price spread, including credible $100-200/night and $200-300/night options when the destination has them, while still checking cleanliness, safety, location, and reviews. Do not omit lower-priced but acceptable hotels merely because they are less stylish.
   - Show the budget range within each tier, such as `$100-200/night`, `$200-300/night`, `$300-450/night`, instead of narrowing the user into one price band.
   - Include nightly price, number of nights, room assumptions, taxes/fees caveat, and subtotal.
   - For each hotel, state whether pricing came from the official website/booking engine, a third-party listing, or an estimate.
   - Explain pros and cons for each option, including location convenience, romance/ambience, parking/resort fees, noise, beach access, nightlife, airport convenience, and whether it fits the selected route.
   - Compare similarly priced hotels against each other and say which one is best for which traveler preference.
   - Double-check hotel location before recommending it: confirm the neighborhood, approximate drive/transit time to planned areas, parking/resort fees when visible, and whether the area matches the trip style. Do not recommend a hotel only because the price looks good if the location would waste trip time.
6. Build daily itinerary:
   - Organize by day and geography to reduce backtracking.
   - Respect companion availability windows. If one traveler has class/work during part of a day, use shared free windows for short, low-friction activities and avoid scheduling major couple activities while the companion is unavailable unless the user wants solo time.
   - Make the final itinerary hour-by-hour whenever dates and duration are known. Include start/end times, transit blocks, buffer/rest time, reservation windows, and realistic meal timing.
   - For arrival/departure days, anchor the schedule around flight landing, hotel check-in, luggage drop, airport transfer, and departure buffer.
   - Include transportation time and cost for every meaningful move between airport, hotel, attractions, restaurants, and departure point. Use realistic ranges for rideshare, parking, public transit, rental car, tolls, or fuel as appropriate.
   - Include attractions such as scenic areas, towns, museums, shopping malls, amusement parks, markets, day trips, and rest time based on the destination.
   - Include ticket price or expected spend after each item.
7. Build food plan:
   - Do not force restaurant selection into the initial itinerary. By default, after generating the route, reserve realistic meal blocks with area and per-person budget. If the user wants restaurant choices, then provide a separate restaurant option pool near that day's route.
   - If recommending restaurants, recommend specific restaurant/cafe names, not only cuisine categories or neighborhoods.
   - Default to restaurants with Google Maps rating above 4.5 when rating information is available. If a highly relevant place is below 4.5 or rating is unavailable, label the exception and explain why it is still included.
   - Recommend multiple restaurants/cafes/local specialties by area or day.
   - Offer varied cuisine and vibe choices so the user can avoid foods they dislike, such as local classics, Asian, Western, seafood, fine dining, casual, dessert/cafe, vegetarian-friendly, and date-night options.
   - Include expected per-person price and subtotal.
   - Double-check restaurant basics before finalizing: restaurant name, Google Maps rating when available, cuisine type, neighborhood, likely price level, reservation need, meal period fit, and whether the restaurant is plausibly open for the planned day/time. If hours are uncertain, flag it and include a nearby backup.
   - If the user says they will choose restaurants themselves, remove fixed restaurant names from the itinerary and keep only meal time, area, and budget.
8. Add optional upgrades and budget-saving swaps when useful.
9. Run a final double-check before the final answer:
   - Recalculate totals from the itemized lines.
   - Confirm per-person versus total group costs.
   - Confirm airfare is charged only to travelers who fly, and local travelers at the destination are not assigned airfare.
   - Confirm hotel names, exact neighborhoods/address areas, official-site or labeled price source, hotel nights, room count, taxes/fees caveat, pros/cons, and location fit.
   - Confirm concrete flight options match dates, departure cities, airports, exact local departure/arrival clock times, nonstop/layover status, fare assumptions, price source, and the user's time preference.
   - Confirm restaurant names, Google Maps rating threshold, varied cuisines, and workable locations.
   - Confirm attraction tickets/opening assumptions and any reservation needs.
   - Confirm every itinerary transfer has estimated time and cost, and confirm local transport, parking, rideshare, insurance, shopping/discretionary spend, and buffer are included or explicitly excluded.
10. End with a clear total budget table and a short "已复核/仍需临近日期确认" note.
11. After any complete itinerary, ask: `这版你满意吗？` If yes, ask: `要不要导出攻略？`
12. If the user says `导出攻略`, create a polished `.docx` document in the workspace `outputs/` folder containing the final itinerary. Use clear section hierarchy, budget tables, daily timelines, links, and tasteful emoji decoration when the user allows it. Do not include restaurant recommendations in the export unless the user selected restaurants or explicitly asks to include them.

## Output Format

Use this structure unless the user requests another format:

```markdown
## 旅行信息确认
...

## 预算总览
| 类别 | 估算方式 | 小计 |
| ... |
| 总计 | ... | ... |

## 可选景点池（先选）
1. 选项名｜类型｜区域｜价格｜时间｜图片/参考｜适合/不适合
2. ...

## 航班选择
F1. 航司/航班号｜去程日期+起飞-到达时间｜回程日期+起飞-到达时间｜机场｜直飞/中转｜价格/来源｜优点｜缺点
F2. ...

## 当地交通
...

## 酒店选择
A. 酒店名｜档位｜具体地点/区域｜官网/价格来源｜价格｜到核心景点交通｜优点｜缺点
B. ...

## 餐厅选择
a. 餐厅名｜Google Maps评分｜菜系｜区域｜价格｜适合餐次｜预约/营业提醒
b. ...

## 最终确认
回复示例：景点 1,2,4；酒店 B；餐厅 a,c,d；航班 F1；生成
也可以回复：你帮我选，生成

## 选择可行性检查
- 已选项目数量：...
- 结论：可安排 / 可安排但时间紧 / 太多需要删减 / 太少建议增加
- 如需删减：请删除 ... 个；以下复现已选项目供重新选择
- 如需增加：建议再选 ... 个

## 每日行程
### Day 1 - 日期
- 09:00-10:00：项目/交通/休息（价格）
- 10:00-10:35：交通：A 到 B（约 35 分钟，$25-45）
- 10:00-12:00：项目（价格）
- 12:00-13:30：餐厅（价格）
- ...

## 餐厅与美食
...

## 可调整选项
...

## 价格说明与来源
...

## 复核说明
- 已复核：...
- 仍需临近日期确认：...
```

Every recommended item should include a price, range, or explicit "免费/无需门票/按消费另计" note. The final budget must include at least flights, hotels, local transportation, restaurants/meals, attractions/tickets, shopping or discretionary spend if requested, travel insurance if relevant, and a 5-15% contingency buffer.

## Budget Rules

- Keep currency consistent with the user's preference. If the destination uses another currency, show both local currency and converted user currency when helpful.
- Make per-person versus group totals unmistakable.
- Do not multiply flights by total travelers unless every traveler is flying. Price flights by traveler and departure city; local companions at the destination have $0 airfare.
- For hotels, calculate by rooms, nights, and occupancy, not by traveler count alone.
- For families or groups, account for child pricing, extra beds, connecting rooms, or suite needs when known.
- If the user's budget is too low, say so directly and offer a workable alternative.
- When no budget is provided, do not ask for one. Provide these default tiers:
  - 舒适性价比: not bare-bones; clean, safe, time-efficient, with a few paid highlights.
  - 中档: balanced comfort, good location, stronger dining and attraction choices.
  - 高档: premium hotel/flight/restaurant choices and more convenience.
- If the user asks for only two tiers, provide 中档 and 高档. If the user wants a lower option, make it "舒适性价比" rather than "寒酸低配".

## Style Guidance

Be practical, specific, and decision-oriented. Avoid generic city descriptions. Explain tradeoffs briefly, such as "更省钱但通勤更久" or "贵一些但适合带老人/小孩". Prefer compact tables for budgets and options, and concise bullets for daily plans.
