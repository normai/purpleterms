#
# file         : 20210427°1711 terminaljs/build.py
# encoding     : UTF-8-with-BOM
# interpeter   : Python 3.7.8
# requirements : • Closure Compiler on drive • Java path set • Python path set
#                 • Path to Closure Compiler registered in config file
# usage        : Write your Closure-Compiler path on a line in

"""
   This minifies PurpleTerms
"""

# In this file register your Closure Compiler binary path
sConfigFile = './docs/path-to-closure-compiler.txt'

import os, sys

os.chdir(os.path.dirname(__file__))

print('* PurpleTerms build *')

# (.) Get bin path
# (.1) Read lines                                                      # [seq 20210429°1511]
sBinGoCloCom = ''
with open(sConfigFile) as f:
    lines = [line.rstrip() for line in f]
# (.2) Find correct line
for line in lines :
   if os.path.isfile(line) :
      sBinGoCloCom = line
      break
# (.3) Paranoia
if sBinGoCloCom == '' :
   print('Fatal — Path to Closure-Compiler not given. Bye.')
   quit()

# Build yes or no?
# Note. This change-detect algorithm is not really water-proof!
bBuild = False
for file in ['./purpleterms.min.js', './purpleterms.min.js.map', './purpleterms.pretty.js'] :
   if not os.path.isfile(file) :
      bBuild = True
   else :
      if os.path.getmtime('./purpleterms.js') > os.path.getmtime(file) \
          or os.path.getmtime('./externs.js') > os.path.getmtime(file) \
           :
         bBuild = True

# Force build anyway? (normally, this is outcommented, activate it if needed)
## bBuild = True

# Assemble commandline
sCmd1 = 'java.exe -jar' + ' ' + sBinGoCloCom                           \
       + ' ' + './externs.js'                                          \
       + ' ' + './purpleterms.js'                                      \
       + ' ' + '--js_output_file' + ' ' + './purpleterms.min.js'       \
       + ' ' + '--create_source_map' + ' ' + './purpleterms.min.js.map' \
       + ' ' + '--formatting' + ' ' + 'PRETTY_PRINT'                   \
       + ' ' + '--compilation_level' + ' ' + 'ADVANCED_OPTIMIZATIONS'  \
       + ' ' + '--charset UTF-8'
     # + ' ' + '--isolation_mode' + ' ' + 'IIFE'
     # + ' ' + '--compilation_level' + ' ' + 'ADVANCED'                # Alternative for ADVANCED_OPTIMIZATIONS

sCmd2 = 'java.exe -jar' + ' ' + sBinGoCloCom                           \
       + ' ' + './externs.js'                                          \
       + ' ' + './purpleterms.js'                                      \
       + ' ' + '--js_output_file' + ' ' + './purpleterms.pretty.js'    \
       + ' ' + '--formatting' + ' ' + 'PRETTY_PRINT'                   \
       + ' ' + '--compilation_level' + ' ' + 'WHITESPACE_ONLY'         \
       + ' ' + '--charset UTF-8'

# Execute command
if bBuild == True :
   print(' — building ...')
   os.system(sCmd1)
   os.system(sCmd2)
else :
   print(' — is up-to-date')

print(' * PurpleTerms building done.')

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Links used while make it work with Closure-Compiler in advanced mode :
#  • https://developers.google.com/closure/compiler/docs/api-tutorial3 [ref 20210418°0913]
#  • https://developers.google.com/closure/compiler/docs/externs-and-exports [ref 20210418°0915]
#  • https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler [ref 20210416°1641, 20210418°0914]
#  • https://www.syntaxsuccess.com/viewarticle/using-the-closure-compiler---advanced_optimizations [ref 20210429°1612]
#  • https://www.syntaxsuccess.com/viewarticle/lazy-loading-with-the-closure-compiler [ref 20210429°1614]
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
