# RouletteMM - Computational Statistics for American Roulette Analysis

RouletteMM is a computational engine designed for analyzing the game of roulette. This application utilizes the law of large numbers to provide visual insights into your expected winning percentage as you increase the number of spins. Additionally, RouletteMM calculates the payout and expected value for each simulation, allowing you to gain a deeper understanding of your betting strategies.

## Usage
Try here: https://josh0xA.github.io/RouletteMM 

## Features
- **Law of Large Numbers Analysis:** RouletteMM leverages the law of large numbers to simulate multiple roulette spins, helping you observe how the expected winning percentage evolves as the number of spins increases.

- **Payout and Expected Value Calculation:** The application provides accurate calculations of the payout and expected value for various betting scenarios, aiding you in assessing the potential profitability of different strategies. RouletteMM will yield the most accurate expected value computation for a large number of trials hence, LLN. 

## LLN Principal 
After each trial, we obtain an $\overline{X}$ and from the simulation as we increase the number of spins, that sample mean ( $\overline{X}$ ) converges closer and closer to the theoretitcal mean ( $\mu$ ). Thus, <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $\overline{X}_n \to \mu \quad\textrm{as}\ n \to \infty \ \textrm{where, } \overline{X}_n=\left(\frac{1}{n}\right)\sum X_i$

## Simple EV Principal 
Expected Value (per trial) is evaluated as such: <br/> 
Since, $E(X) = \mu = \sum x P(x)$. This would mean in our case we would assess the following: <br/> 
<space><space><space><space>*<space>$E(X) = (Pr(x) \cdot x') - (Pr(\neg x) \cdot b)$ where, $x'$ is the payout for $x$ and $b$ is the bet amount. 

## Visual Aid (spins=1000, bet=8)
<img src="https://github.com/josh0xA/RouletteMM/blob/master/RouletteMM_example.png?raw=true"> 


   
