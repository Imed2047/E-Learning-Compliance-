
import { PlatformData } from '../types';

export const platformData: PlatformData = {
  "platform": "E-learning Compliance",
  "last_updated": "2024",
  "sections": [
    {
      "id": "initiation",
      "name": "Initiation",
      "icon": "📚",
      "description": "Fondamentaux de la Lutte Contre le Blanchiment",
      "modules": [
        {
          "id": "1.1",
          "title": "Introduction au Blanchiment d'Argent",
          "author": "Imed Chekhab – Compliance Officer",
          "duration": 15,
          "difficulty": "beginner",
          "objectives": [
            "Comprendre les concepts fondamentaux du blanchiment",
            "Identifier les trois étapes du processus de blanchiment"
          ],
          "content": {
            "case_study": {
              "title": "Cas Société Fictive - Transactions suspectes",
              "content": "Une entreprise de commerce électronique présente des patterns de transactions inhabituels : dépôts en espèces fréquents juste en dessous du seuil de déclaration (9 500€), suivis de virements internationaux vers des juridictions à risque. Le client justifie ces activités par des ventes en ligne mais refuse de fournir des documents complémentaires malgré plusieurs relances.",
              "learning_points": [
                "Analyse des patterns transactionnels",
                "Identification des red flags comportementaux",
                "Procédure de due diligence renforcée"
              ]
            },
            "definitions": [
              {
                "term": "Blanchiment d'argent",
                "definition": "Processus consistant à dissimuler l'origine illicite de fonds obtenus par des activités criminelles afin de leur donner une apparence légitime.",
                "reference": "Article 324-1 du Code pénal français"
              },
              {
                "term": "Seuil de déclaration",
                "definition": "Montant au-delà duquel les professionnels assujettis ont l'obligation de déclarer les transactions suspectes aux autorités compétentes.",
                "reference": "Article L. 561-15 du Code monétaire et financier"
              }
            ],
            "red_flags": [
              {
                "description": "Structuring ou fractionnement de transactions",
                "severity": "high",
                "examples": [
                  "Dépôts en espèces de 9 500€ effectués de manière répétée",
                  "Virements fractionnés pour éviter les seuils de détection"
                ],
                "investigation_actions": [
                  "Analyser l'historique transactionnel sur 6 mois",
                  "Vérifier la cohérence avec l'activité déclarée"
                ]
              },
              {
                "description": "Transactions vers des juridictions à risque",
                "severity": "medium",
                "examples": [
                  "Virements réguliers vers des paradis fiscaux",
                  "Paiements à des sociétés écrans"
                ],
                "investigation_actions": [
                  "Identifier la destination finale des fonds",
                  "Vérifier la légitimité des contreparties"
                ]
              }
            ]
          },
          "quiz": {
            "questions": [
              {
                "id": "q1",
                "question": "Quel est le seuil de déclaration obligatoire pour les transactions en espèces en France ?",
                "options": [
                  {"id": "A", "text": "5 000 €", "correct": false},
                  {"id": "B", "text": "8 000 €", "correct": false},
                  {"id": "C", "text": "10 000 €", "correct": true},
                  {"id": "D", "text": "15 000 €", "correct": false}
                ],
                "explanation": "Le seuil de déclaration obligatoire est fixé à 10 000 € en France selon l'article L. 561-15 du Code monétaire et financier.",
                "reference": "Article L. 561-15 CMF"
              },
              {
                "id": "q2",
                "question": "Quelle pratique consiste à fractionner des transactions pour éviter les seuils ?",
                "options": [
                  {"id": "A", "text": "Smurfing", "correct": false},
                  {"id": "B", "text": "Structuring", "correct": true},
                  {"id": "C", "text": "Layering", "correct": false},
                  {"id": "D", "text": "Integration", "correct": false}
                ],
                "explanation": "Le structuring consiste à diviser une somme importante en plusieurs transactions plus petites.",
                "reference": "Guide Tracfin 2023"
              }
            ],
            "passing_score": 1
          }
        },
        {
          "id": "1.2",
          "title": "Cadre Réglementaire LCB-FT",
          "author": "Imed Chekhab – Compliance Officer",
          "duration": 20,
          "difficulty": "beginner",
          "content": {
            "case_study": {
              "title": "Cas d'une institution financière non conforme",
              "content": "Un établissement de crédit fait l'objet d'un contrôle de l'ACPR. Les inspecteurs constatent l'absence de procédures formalisées de due diligence."
            },
            "definitions": [
              {
                "term": "Personne Politiquement Exposée (PPE)",
                "definition": "Personne qui occupe ou a occupé une fonction publique importante.",
                "reference": "Article L. 561-10 CMF"
              }
            ],
            "red_flags": [
              {
                "description": "Client PPE non identifié",
                "severity": "high",
                "examples": ["Ouverture de compte pour un ancien ministre non déclaré"]
              }
            ]
          },
          "quiz": {
            "questions": [
              {
                "id": "q1",
                "question": "Quel est l'organisme de supervision des établissements bancaires ?",
                "options": [
                  {"id": "A", "text": "Tracfin", "correct": false},
                  {"id": "B", "text": "L'ACPR", "correct": true},
                  {"id": "C", "text": "La Banque de France", "correct": false}
                ],
                "explanation": "L'ACPR est responsable de la supervision des établissements bancaires.",
                "reference": "Code monétaire et financier"
              }
            ],
            "passing_score": 1
          }
        }
      ]
    },
    {
      "id": "intermediaire",
      "name": "Intermédiaire",
      "icon": "🎯",
      "description": "Études de cas pratiques et analyses approfondies",
      "modules": [
         {
          "id": "2.1",
          "title": "Le cycle de vie d’une Déclaration de Soupçon : de l'Orientation à l'Enquête",
          "author": "Imed Chekhab – Compliance Officer",
          "duration": 25,
          "difficulty": "intermediate",
          "content": {
            "case_study": {
              "title": "Énoncé du Cas",
              "content": "En janvier N, un petit établissement de crédit soumet une Déclaration de Soupçon (DS) sur M. DURAND pour une série de petits virements vers l'étranger, le soupçon étant vague (\"transferts suspects\"). Le dossier est initialement classé en \"Mise en attente\" par Tracfin. En décembre N+2, le même établissement soumet une nouvelle DS sur M. DURAND, car il a tenté d'obtenir un crédit à la consommation avec des faux bulletins de paie et a procédé à des retraits importants en espèces."
            },
            "definitions": [
              {
                "term": "Orientation",
                "definition": "Le premier acte d’analyse d’une information qui détermine si elle fera l'objet d'une enquête ou d'une mise en attente."
              },
              {
                "term": "Mise en Attente",
                "definition": "Décision prise lorsque l’information semble potentiellement inexploitable, si le soupçon est peu clair, ou si le doute est levé après enquête."
              },
              {
                "term": "Réactivation",
                "definition": "Possibilité d'analyser à nouveau une information antérieurement mise en attente. Tracfin peut réactiver des informations reçues au titre des années antérieures, dans la limite de dix ans."
              }
            ],
             "red_flags": [
              {
                "description": "Information Potentiellement Inexploitable",
                "severity": "high"
              },
              { "description": "Défaut de Qualité des DS", "severity": "high" }
            ]
          },
          "quiz": {
            "questions": [
              {
                "question": "Quel est le délai maximum de conservation des informations reçues par Tracfin, qui détermine également la limite de temps pour la réactivation d'un dossier ?",
                "options": [
                  {"id": "A", "text": "5 ans", "correct": false},
                  {"id": "B", "text": "10 ans", "correct": true},
                  {"id": "C", "text": "15 ans", "correct": false},
                  {"id": "D", "text": "20 ans", "correct": false}
                ],
                "explanation": "Tracfin est susceptible de réactiver des informations reçues au titre des années antérieures (dans la limite de dix ans)."
              },
              {
                "question": "Lorsque l’information semble potentiellement inexploitable, quelle décision est prise lors de la phase d'Orientation ?",
                "options": [
                  {"id": "A", "text": "L'Externalisation immédiate", "correct": false},
                  {"id": "B", "text": "La Réactivation", "correct": false},
                  {"id": "C", "text": "La Mise en attente", "correct": true},
                  {"id": "D", "text": "Le Droit d'Opposition", "correct": false}
                ],
                "explanation": "L’information est mise en attente lorsqu’elle semble potentiellement inexploitable ou le soupçon peu clair."
              }
            ],
            "passing_score": 1
          }
        }
      ]
    },
    {
      "id": "experimente",
      "name": "Expérimenté",
      "icon": "🚀",
      "description": "Scénarios complexes, stratégies avancées et enjeux du renseignement financier",
      "modules": [
        {
          "id": "3.1",
          "title": "Coopération Opérationnelle Internationale : Réseaux, Flux et Contrôle de l’Utilisation",
          "author": "Imed Chekhab – Compliance Officer",
          "duration": 25,
          "difficulty": "expert",
          "content": {
            "case_study": {
              "title": "Énoncé du Cas",
              "content": "Tracfin reçoit une demande d'information urgente via le réseau FIU.NET de la part de la Cellule de Renseignement Financier (CRF) allemande, concernant une société française impliquée dans une fraude à la TVA intracommunautaire. Après avoir enrichi l'information, Tracfin souhaite transmettre le dossier à l'Autorité judiciaire française pour lancer des poursuites. L'analyste doit s'assurer de respecter le principe fondamental de la coopération opérationnelle internationale afin de garantir l'admissibilité de l'information en justice."
            },
            "definitions": [
              {
                "term": "Groupe Egmont",
                "definition": "Organisation internationale qui regroupe les Cellules de Renseignement Financier (CRF) du monde entier."
              },
              {
                "term": "FIU.NET",
                "definition": "Réseau sécurisé et décentralisé d'échanges d'informations entre les CRF de l’Union européenne."
              },
              {
                "term": "Contrôle de l’Utilisation",
                "definition": "Règle fondamentale selon laquelle l'information ne peut être utilisée à des fins répressives sans autorisation écrite de la CRF émettrice."
              }
            ],
            "red_flags": [
                { "description": "Manquement au Contrôle de l’Utilisation", "severity": "very_high" }
            ]
          },
          "quiz": {
            "questions": [
              {
                "question": "Quel est le réseau sécurisé utilisé pour les échanges d'informations entre les CRF de l'Union européenne ?",
                "options": [
                  {"id": "A", "text": "Egmont Secure Web", "correct": false},
                  {"id": "B", "text": "FIU.NET", "correct": true},
                  {"id": "C", "text": "TRAJET", "correct": false},
                  {"id": "D", "text": "ERMES", "correct": false}
                ],
                "explanation": "Le FIU.NET est le réseau sécurisé d'échanges entre les CRF de l’Union européenne."
              },
              {
                "question": "Quel principe fondamental exige que l'information transmise par une CRF étrangère ne soit utilisée à des fins répressives que si elle a été autorisée expressément par écrit ?",
                "options": [
                  {"id": "A", "text": "La Réciprocité", "correct": false},
                  {"id": "B", "text": "Le Secret Bancaire", "correct": false},
                  {"id": "C", "text": "Le Contrôle de l’Utilisation", "correct": true},
                  {"id": "D", "text": "La Confidentialité", "correct": false}
                ],
                "explanation": "Le contrôle de l’utilisation exige une autorisation écrite pour l'usage répressif."
              }
            ],
            "passing_score": 1
          }
        }
      ]
    }
  ]
};
